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
});
