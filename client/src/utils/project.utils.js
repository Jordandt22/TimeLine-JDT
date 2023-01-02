export const statusList = [
  {
    text: "All",
    className: "",
    filter: "",
    val: 4,
  },
  {
    text: "On Hold",
    className: "status-on-hold",
    filter: "isOnHold",
    val: 1,
  },
  {
    text: "Developing",
    className: "status-developing",
    filter: "isDeveloping",
    val: 2,
  },
  {
    text: "Finished",
    className: "status-finished",
    filter: "isFinished",
    val: 3,
  },
];

export const checkStatus = (status) =>
  status.isOnHold
    ? statusList[1]
    : status.isDeveloping
    ? statusList[2]
    : status.isFinished
    ? statusList[3]
    : { text: "No Status", className: "", filter: "" };

export const createStatusObj = (statusInput, status) => {
  // Updating the Status Obj
  let newStatus = {
    isOnHold: false,
    isDeveloping: false,
    isFinished: false,
  };
  switch (statusInput) {
    case 1:
      newStatus.isOnHold = true;
      break;

    case 2:
      newStatus.isDeveloping = true;
      break;

    case 3:
      newStatus.isFinished = true;
      break;

    default:
      newStatus = status;
      break;
  }

  return newStatus;
};
