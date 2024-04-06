const countTime = (time: string) => {
    const currentTime = new Date();
    const timePost = new Date(time);
    const timeDiffMs = currentTime.getTime() - timePost.getTime();
    const timeDiffMinutes = Math.floor(timeDiffMs / (1000 * 60));
    const timeDiffHours = Math.floor(timeDiffMs / (1000 * 60 * 60));
    const timeDiffDays = Math.floor(timeDiffMs / (1000 * 60 * 60 * 24));
    const timeDiffMonths =
        (currentTime.getFullYear() - timePost.getFullYear()) * 12 + (currentTime.getMonth() - timePost.getMonth());

    if (timeDiffMonths > 0) {
        return timeDiffMonths + ' tháng trước';
    } else if (timeDiffDays > 0) {
        return timeDiffDays + ' ngày trước';
    } else if (timeDiffHours > 0) {
        return timeDiffHours + ' giờ trước';
    } else if (timeDiffMinutes > 0) {
        return timeDiffMinutes + ' phút trước';
    } else {
        return '0';
    }
};

export default countTime;
