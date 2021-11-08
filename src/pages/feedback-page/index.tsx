import { Select, Button, Tag, Rate, Pagination, Divider } from "antd";
import { CaretDownOutlined, CommentOutlined } from "@ant-design/icons";
import "./index.scss";
import { useQuery } from "react-query";
import { useState } from "react";
import { Feedback, feedbackQueryFns } from "src/services/api/feedback";
import { BiikeFeedbackDetailModal } from "src/organisms/feedback-detail-modal";

interface FeedbackDetailModal {
  openId: number;
  data?: Feedback;
}

interface BiikeFeedBackPageProps {}

export const BiikeFeedbackPage = (props: BiikeFeedBackPageProps) => {
  // paging
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
    total: 10,
  });

  const { data, isFetching, refetch } = useQuery(
    ["feedbacks", pagination.page, pagination.pageSize],
    () =>
      feedbackQueryFns.feedbacks({
        page: pagination.page,
        limit: pagination.pageSize,
      }),
    {
      onSuccess: (data) => {
        setPagination((prev) => ({ ...prev, total: data._meta.totalRecord }));
      },
    }
  );

  const handlePageChange = (page: number, pageSize?: number) => {
    setPagination((prev) => ({
      ...prev,
      page,
      ...(pageSize !== prev.pageSize ? { pageSize, page: 1 } : {}),
    }));
  };

  // view
  const [feedbackDetailModal, setFeedbackDetailModal] =
    useState<FeedbackDetailModal>({
      openId: -1,
    });

  const toggleFeedbackDetailModalVisible = (openId: number) => {
    setFeedbackDetailModal((prev) => ({
      ...prev,
      openId: prev.openId === openId ? -1 : openId,
    }));
  };

  const openFeedbackDetailModal = (data: Feedback) => {
    setFeedbackDetailModal({ openId: data.feedbackId, data });
  };

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
                  <span className="font-bold">{feedback.userFullname}</span>{" "}
                  đánh giá{" "}
                  <span>
                    <Rate
                      className="text-sm"
                      disabled
                      defaultValue={feedback.tripStar}
                    />
                  </span>
                </div>
                <Tag color="processing">{feedback.criteria}</Tag>

                <div className="feedback-address text-sm">
                  <CommentOutlined /> {feedback.feedbackContent}
                </div>
              </div>
            </div>
            <div className="item-tools">
              <Button
                type="primary"
                className="rounded"
                onClick={() => openFeedbackDetailModal(feedback)}
              >
                Xem
              </Button>

              <BiikeFeedbackDetailModal
                visibleManage={[
                  feedbackDetailModal.openId === feedback.feedbackId,
                  toggleFeedbackDetailModalVisible,
                ]}
                feedback={feedback}
              />
              {/* <Button type="primary" danger className="rounded">
                Xóa
              </Button> */}
            </div>
          </div>
        ))}
        <Divider />
        <Pagination
          current={pagination.page}
          pageSize={pagination.pageSize}
          onChange={handlePageChange}
          total={pagination.total}
        />
      </div>
    </div>
  );
};
