import dayjs from 'dayjs';
import { CalendarCell } from '../_type/components/calendar';

/**
 * 获取一个日期是周几（1~7）
 */
export const getDay = (dt: Date): number => {
  let day = dayjs(dt).day();
  if (day === 0) {
    day = 7;
  }
  return day;
};

/**
 * 将 month 映射为文字输出
 * @param month 月份下标值（起始值为0）
 */
export const getMonthCN = (month: number): string =>
  ({
    0: '一月',
    1: '二月',
    2: '三月',
    3: '四月',
    4: '五月',
    5: '六月',
    6: '七月',
    7: '八月',
    8: '九月',
    9: '十月',
    10: '十一月',
    11: '十二月',
  }[month]);

/**
 * 创建日历单元格数据
 * @param year 日历年份
 * @param month 日历月份
 * @param firstDayOfWeek 周起始日（1~7）
 * @param currentValue 当前日期
 * @param format 日期格式
 */
export const createDateList = (
  year: number,
  month: number,
  firstDayOfWeek: number,
  currentValue: dayjs.Dayjs,
  format: string,
): CalendarCell[][] => {
  const createCellData = (belongTo: number, isCurrent: boolean, date: Date, weekOrder: number): CalendarCell => {
    const day = getDay(date);
    return {
      mode: 'month',
      belongTo,
      isCurrent,
      day,
      weekOrder,
      date,
      formattedDate: dayjs(date).format(format),
      filterDate: null,
      formattedFilterDate: null,
      isShowWeekend: true,
    };
  };

  const monthFirstDay = dayjs(`${year}-${month}`);
  const rowList = [] as CalendarCell[][];
  let list = [] as CalendarCell[];
  let weekCount = 1;

  // 添加上个月中会在本月显示的最后几天日期
  const lastMonthDaysCount = (getDay(monthFirstDay.toDate()) - firstDayOfWeek + 7) % 7;
  for (let i = 0; i < lastMonthDaysCount; i++) {
    const dayObj = monthFirstDay.subtract(i + 1, 'day');
    list.unshift(createCellData(-1, false, dayObj.toDate(), weekCount));
  }

  // 添加本月日期
  const monthDaysCount = monthFirstDay.endOf('month').daysInMonth();
  for (let i = 0; i < monthDaysCount; i++) {
    const dayObj = monthFirstDay.add(i, 'day');
    list.push(createCellData(0, currentValue.isSame(dayObj), dayObj.toDate(), weekCount));
    if (list.length === 7) {
      rowList.push(list);
      list = [];
      weekCount += 1;
    }
  }

  // 添加下月日期
  if (list.length) {
    const monthLastDay = dayjs(`${year}-${month}`).endOf('month');
    const nextMonthDaysCount = 7 - list.length;
    for (let i = 0; i < nextMonthDaysCount; i++) {
      const dayObj = monthLastDay.add(i + 1, 'day');
      list.push(createCellData(1, false, dayObj.toDate(), weekCount));
    }
    rowList.push(list);
  }

  return rowList;
};

/**
 * 创建月历单元格数据
 * @param year 月历年份
 * @param currentValue 当前日期
 * @param format 输出格式
 * @param rowNum 一行日历的个数
 */
export const createMonthList = (
  year: number,
  currentValue: dayjs.Dayjs,
  format: string,
  rowNum = 4,
): CalendarCell[][] => {
  const monthsArr: CalendarCell[][] = [];
  const isCurYear = currentValue.year() === year;
  let tmpArr: CalendarCell[] = [];
  for (let i = 1; i <= 12; i++) {
    const date = new Date(year, i - 1);
    const curDateMon = parseInt(currentValue.format('M'), 10);
    const isCurrent = isCurYear && curDateMon === i;
    tmpArr.push({
      mode: 'year',
      isCurrent,
      date,
      formattedDate: dayjs(date).format(format),
      filterDate: null,
      formattedFilterDate: null,
      isShowWeekend: true,
    });
    if (tmpArr.length === rowNum) {
      monthsArr.push(tmpArr);
      tmpArr = [];
    }
  }

  return monthsArr;
};