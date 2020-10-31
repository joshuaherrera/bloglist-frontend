import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  test("Renders author and url only", () => {
    const blog = {
      title: "Test Title",
      likes: 999,
      url: "test.com",
      author: "Jest",
      id: "BlogID",
      user: {
        username: "testUser",
        name: "testUserName",
        id: "testUserID",
      },
    };

    const component = render(<Blog blog={blog} user="testUser" />);
    const rendered = component.container.querySelector(".displayBlog");
    expect(rendered).toHaveTextContent("Test Title");
    expect(rendered).toHaveTextContent("test.com");

    const hidden = component.container.querySelector(".dynamicDisplay");
    expect(hidden).toHaveStyle("display:none");
  });

  test("Show url and likes when button clicked", () => {
    const blog = {
      title: "Test Title",
      likes: 999,
      url: "test.com",
      author: "Jest",
      id: "BlogID",
      user: {
        username: "testUser",
        name: "testUserName",
        id: "testUserID",
      },
    };

    // const blogService = {
    //   updateBlog: (updatedBlog, blogId) => {
    //     //
    //   },
    // };

    const component = render(<Blog blog={blog} user="testUser" />);

    const button = component.getByText("view");
    fireEvent.click(button);

    const shown = component.container.querySelector(".dynamicDisplay");
    expect(shown).toHaveStyle("display:block");

    const url = component.container.querySelector("#blogUrl");
    expect(url).toHaveTextContent("test.com");

    const likes = component.container.querySelector("#blogLikes");
    expect(likes).toHaveTextContent("999");
  });

  test("Check if like button is clicked twice", () => {
    const blog = {
      title: "Test Title",
      likes: 999,
      url: "test.com",
      author: "Jest",
      id: "BlogID",
      user: {
        username: "testUser",
        name: "testUserName",
        id: "testUserID",
      },
    };

    const blogService = {
      updateBlog: jest.fn(),
    };

    const component = render(
      <Blog blog={blog} user="testUser" blogService={blogService} />
    );

    const button = component.getByText("view");
    fireEvent.click(button);

    const shown = component.container.querySelector(".dynamicDisplay");
    expect(shown).toHaveStyle("display:block");
    const likeBtn = component.getByText("like");
    fireEvent.click(likeBtn);
    fireEvent.click(likeBtn);
    expect(blogService.updateBlog.mock.calls).toHaveLength(2);
  });
});
