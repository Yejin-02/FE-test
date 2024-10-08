import "./locales/index.ts";

import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import queryClient from "./api/queryClient";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import Board from "./pages/Board.tsx";
import CreatePostPage from "./pages/CreatePostPage.tsx";
import DefaultBoard from "./pages/DefaultBoard.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import PostDetail from "./pages/PostDetail.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import SearchPost from "./pages/SearchPost.tsx";
import SearchTag from "./pages/SearchTag.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import TagBoard from "./pages/TagBoard.tsx";
import { MainContainer, MainWrapper } from "./styledComponents.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "",
        element: <DefaultBoard />,
      },
      {
        path: "boards/:boardUuid",
        element: <Board />,
      },
      {
        path: "tags/:tag",
        element: <TagBoard />,
      },
    ],
  },
  {
    path: "/create-post",
    element: <CreatePostPage />,
  },
  {
    path: "/sign-up",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/post-detail/:id",
    element: <PostDetail />,
  },
  {
    path: "/user-settings",
    element: <SettingsPage />,
  },
  {
    path: "/search-posts",
    element: <SearchPost />,
  },
  {
    path: "/search-tags",
    element: <SearchTag />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MainWrapper>
          <MainContainer>
            <RouterProvider router={router} />
          </MainContainer>
        </MainWrapper>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
