import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PostForm from "../components/PostForm";
import { Button, Card } from "antd";

function PostsList() {
  return (
    <div>
      <Header />

      <PostForm />

      <Footer />
    </div>
  );
}

export default PostsList;
