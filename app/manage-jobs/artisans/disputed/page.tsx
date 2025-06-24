import DisputedJob from "@/components/ManageJobs/Disputed";
import { dispute } from "@/utils/job";

export default function DisputedJobs() {
  return (
    <div>
      <DisputedJob job={dispute} />
    </div>
  );
}
