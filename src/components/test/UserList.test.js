import React from "react";
import { shallow } from "enzyme";
import { UserList } from "../UserList";
import { UserDetails } from "../../UserDetails/UserDetails";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

describe("UserList", () => {
  it("renders UserList component", () => {
    const wrapper = shallow(<UserList users={[]} />);
    expect(wrapper.find(".ContentPlaylist").exists()).toBeTruthy();
  });

  it("clicking on user should display UserDetails component", () => {
    const users = [{ id: 1, login: "user1" }];
    const wrapper = shallow(<UserList users={users} />);
    wrapper.find("li").simulate("click");
    expect(wrapper.find(UserDetails).exists()).toBeTruthy();
  });

  it("sort button should work properly", () => {
    const users = [
      { id: 1, login: "user1", repositories: 5 },
      { id: 2, login: "user2", repositories: 3 },
    ];
    const wrapper = shallow(<UserList users={users} />);
    expect(wrapper.find("li").at(0).text()).toEqual("user1");
    wrapper.find("button").simulate("click");
    expect(wrapper.find("li").at(0).text()).toEqual("user2");
  });
});
