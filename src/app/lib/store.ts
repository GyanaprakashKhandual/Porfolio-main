import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./features/music/music.slice";
import likesReducer from "./features/likes/like.slice";
import commentsReducer from "./features/comments/comment.slice";
import contactReducer from "./features/contact/contact.slice";

export const store = configureStore({
  reducer: {
    music: musicReducer,
    likes: likesReducer,
    comments: commentsReducer,
    contact: contactReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;