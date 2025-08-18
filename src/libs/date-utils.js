/**
 * 日期格式化
 * @param date 日期
 */
export function formatDate(date) {
  let separator = "-";
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  return year + separator + month + separator + strDate;
}
