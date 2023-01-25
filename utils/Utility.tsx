export const Utility = {
  getDDay(remainDay: string) {
    const remainDayToInt = parseInt(remainDay);

    if (!remainDayToInt) {
      return 'D-day 🎉';
    } else if (remainDayToInt < 0) {
      return 'Done!';
    } else {
      return `D-${remainDayToInt}`;
    }
  },

  getIsOutDated(dateInStr: string) {
    const today = new Date();
    const date = new Date(dateInStr);

    return today.getTime() - date.getTime() > 0 ? true : false;
  },

  getRemainPackDesc(packRemainNum: string, date: string) {
    const packRemainNumToInt = parseInt(packRemainNum);
    const isOutdated =
      date.includes('-') || date.includes('.') ? this.getIsOutDated(date) : parseInt(date) < 0;

    // 출발일이 지난 경우, 남은 짐의 존재여부와 관계없이 아무것도 보여주지 않음.
    if (isOutdated) {
      return;
    }

    if (!isOutdated && packRemainNumToInt > 0) {
      return (
        <span>
          아직 <em>{packRemainNumToInt}</em>개의 짐이 남았어요!
        </span>
      );
    } else {
      return (
        <span>
          <em>패킹</em>이 완료되었어요!
        </span>
      );
    }
  },

  convertDateFormatToDot(date: string) {
    return date.includes('-') ? date.replaceAll('-', '.') : date;
  },
};
