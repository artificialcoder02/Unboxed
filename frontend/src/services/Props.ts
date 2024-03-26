import React from "react";

export interface ModalProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  recent: boolean;
  setRecent: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ContentProps {
  _id: string;
  keyword: string;
  user_id: string;
  post_url: string;
  comments_count: number;

  description?: string;
  likes?: number;
  image_url?: string;

  user_name?: string;
  profile_url?: string;
  post_date?: string;
  post_text?: string;
  likes_count?: number;
  shares_count?: number;
  views_count?: number;
  media_urls?: string[];
}
