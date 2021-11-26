export const GENDER: { [key: number]: string } = {
  1: "Nam",
  2: "Nữ",
  3: "Không muốn nói",
};

export const TRIP_STATUS: { [key: number]: string } = {
  1: "Đang tìm",
  2: "Đang chờ",
  3: "Đang diễn ra",
  4: "Thành công",
  5: "Thất bại",
};

// export const BIKE_STATUS: { [key: number]: string } = {
//   1: "Chưa xác minh",
//   2: "Đã xác minh hợp lệ",
//   3: "Đã xác minh không hợp lệ",
// };

export enum BIKE_STATUS {
  UN_VERIFIED = 1,
  SUCCESS_VERIFIED = 2,
  FAIL_VERIFIED = 3,
}
