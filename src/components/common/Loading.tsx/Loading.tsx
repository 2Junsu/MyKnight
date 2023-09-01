import { PulseLoader } from "react-spinners";

import { color } from "../../../style/common/color";

const Loading = () => {
  return (
    <div>
      <PulseLoader color={color.blue} />
    </div>
  );
};

export default Loading;
