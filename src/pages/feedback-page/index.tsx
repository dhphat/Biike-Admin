import { Select, Button } from "antd";
import {
  CaretDownOutlined,
  CheckCircleOutlined,
  CommentOutlined,
  StarOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { useQuery } from "react-query";
import { feedbackQueryFns } from "src/services/api/feedback";

interface BiikeFeedBackPageProps {}

export const BiikeFeedbackPage = (props: BiikeFeedBackPageProps) => {
  const { data, isFetching } = useQuery(["feedbacks"], () =>
    feedbackQueryFns.feedbacks({ page: 1, limit: 10 })
  );

  return (
    <div className="biike-feedback-page px-4">
      <div className="biike-feedback-tools">
        <Select
          suffixIcon={<CaretDownOutlined className="text-gray-500" />}
          defaultValue="all"
          options={[
            { label: "Tất cả", value: "all" },
            { label: "5 sao", value: "fiveStars" },
            { label: "4 sao", value: "fourStars" },
            { label: "3 sao", value: "threeStars" },
            { label: "2 sao", value: "twoStars" },
            { label: "1 sao", value: "oneStar" },
          ]}
        />
      </div>
      <div className="biike-feedback-content mt-4">
        {data?.data.map((feedback) => (
          <div className="feedback-item bg-white px-8 py-4 content-center">
            <div className="item-details text-gray-500 mb-1">
              <div className="item-details text-gray-500 ">
                <div className="feedback-name text-base ">
                  <span className="font-bold">User {feedback.userId}</span> đánh
                  giá <span className="font-bold">{feedback.tripStar} sao</span>
                </div>
                <span className="font-bold">
                  <CheckCircleOutlined /> {feedback.criteria}
                </span>
                <div className="feedback-address text-sm">
                  <CommentOutlined /> {feedback.feedbackContent}
                </div>
              </div>
            </div>
            <div className="item-tools">
              <Button type="primary" className="rounded">
                Xem
              </Button>
              <Button type="primary" className="rounded">
                Sửa
              </Button>
              <Button type="primary" danger className="rounded">
                Xóa
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
