import Contributions from "./Contributions";
import Analytics from "./Analytics";

import Breakline from "@/common/components/elements/Breakline";
import { GITHUB_ACCOUNTS } from "@/common/constants/github";

const Dashboard = () => {
  return (
    <>
      <Analytics />
      <Breakline className="my-8" />
      <Contributions endpoint={GITHUB_ACCOUNTS.endpoint} />
    </>
  );
};

export default Dashboard;
