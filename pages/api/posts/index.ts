import { NextApiRequest, NextApiResponse } from "next";
import mockPosts from "../../../mock/posts.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // HTTP 메소드에 따라 다른 처리
  switch (req.method) {
    case "GET":
      // 쿼리 파라미터에 따른 필터링
      const { category } = req.query;

      let filteredPosts = [...mockPosts];

      if (category && typeof category === "string") {
        filteredPosts = mockPosts.filter(
          (post) => post.category.toLowerCase() === category.toLowerCase()
        );
      }

      // 성공적인 응답 반환
      return res.status(200).json({
        success: true,
        count: filteredPosts.length,
        data: filteredPosts,
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
