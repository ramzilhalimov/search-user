import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthorization } from "../store/slices/authenticationSlice";

const DATA_TAG = { type: "Tracks", id: "LIST" };

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "https://api.github.com/search/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authorization?.access;

      if (
        token &&
        args.queryKey !== "getAllTracks" &&
        args.queryKey !== "getCatalogSection" &&
        args.queryKey !== "getCatalogSectionTracks"
      ) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  });

  if (
    args.queryKey === "getAllTracks" &&
    args.queryKey === "getCatalogSection" &&
    args.queryKey === "getCatalogSectionTracks"
  ) {
    const returnRes = await baseQuery(args, api, extraOptions);
    return returnRes;
  }

  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status !== 401) {
    return result;
  }

  const forceLogout = () => {
    api.dispatch(setAuthorization(null));
    window.location.href = "/login";
  };

  const authentication =
    api.getState().authentication ?? sessionStorage.getItem("refresh");
  console.log(authentication);
  if (!authentication.refresh) {
    return forceLogout();
  }

  // Делаем запрос за новым access токеном в API обновления токена
  const refreshResult = await baseQuery(
    {
      url: "/user/token/refresh/",
      method: "POST",
      body: {
        refresh: sessionStorage.getItem("refresh"),
      },
    },
    api,
    extraOptions
  );

  if (!refreshResult.data.access) {
    return forceLogout();
  }

  api.dispatch(
    setAuthorization({ ...authentication, access: refreshResult.data.access })
  );
  sessionStorage.setItem("access", refreshResult.data.access);

  const retryResult = await baseQuery(args, api, extraOptions);

  if (retryResult?.error?.status === 401) {
    return forceLogout();
  }

  return retryResult;
};
const getToken = () => {
  const token = sessionStorage.getItem("access");
  return `Bearer ${token}`;
};

export const playlistApi = createApi({
  reducerPath: "tracksListApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllTracks: builder.query({
      query: () => ({
        url: "users?q=Q",
      }),
      providesTags: (result = []) => [
        ...(Array.isArray(result)
          ? result.map(({ id }) => ({ type: DATA_TAG.type, id }))
          : []),
        DATA_TAG,
      ],
    }),

    getCatalogSection: builder.query({
      query: () => ({
        url: "/catalog/selection/",
        headers: {
          Authorization: getToken(),
        },
      }),
    }),
    getCatalogSectionTracks: builder.query({
      query: (id) => ({
        url: `/catalog/selection/${id}`,
        headers: {
          Authorization: getToken(),
        },
      }),
      providesTags: (result = []) => [
        ...(Array.isArray(result)
          ? result.map(({ id }) => ({ type: DATA_TAG.type, id }))
          : []),
        DATA_TAG,
      ],
    }),

    getFavoritesTracks: builder.query({
      query: () => ({
        url: "/catalog/track/favorite/all/",
        headers: {
          Authorization: getToken(),
        },
      }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: DATA_TAG.type, id })),
        DATA_TAG,
      ],
      transformResponse: (response) => {
        const transformedResponse = response.map((item) => ({
          ...item,
          stared_user: [JSON.parse(sessionStorage.getItem("user"))],
        }));

        return transformedResponse;
      },
    }),

    likeTrackFavorites: builder.mutation({
      query(data) {
        const { id } = data;
        return {
          url: `/catalog/track/${id}/favorite/`,
          method: "POST",
          headers: {
            Authorization: getToken(),
          },
        };
      },
      invalidatesTags: [{ type: "Tracks" }],
    }),

    dislikeTrackFavorites: builder.mutation({
      query(data) {
        const { id } = data;
        return {
          url: `/catalog/track/${id}/favorite/`,
          method: "DELETE",
          headers: {
            Authorization: getToken(),
          },
        };
      },
      invalidatesTags: [{ type: "Tracks" }],
    }),
  }),
});

export const {
  useGetCatalogSectionQuery,
  useGetCatalogSectionTracksQuery,
  useGetFavoritesTracksQuery,
  useLikeTrackFavoritesMutation,
  useDislikeTrackFavoritesMutation,
  useGetAllTracksQuery,
} = playlistApi;
