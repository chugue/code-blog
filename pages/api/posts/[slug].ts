import { NextApiRequest, NextApiResponse } from "next";
import mockPosts from "../../../mock/posts.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({
      success: false,
      message: "Invalid slug parameter",
    });
  }

  // 해당 슬러그에 맞는 포스트 찾기
  const post = mockPosts.find(
    (post) => post.slug.toLowerCase() === slug.toLowerCase()
  );

  // 포스트가 없는 경우 404 응답
  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }

  // HTTP 메소드에 따라 다른 처리
  switch (req.method) {
    case "GET":
      // 포스트 데이터 반환
      return res.status(200).json({
        success: true,
        data: post,
      });

    default:
      // 지원하지 않는 HTTP 메소드인 경우
      res.setHeader("Allow", ["GET"]);
      return res.status(405).json({
        success: false,
        message: `Method ${req.method} Not Allowed`,
      });
  }
}
