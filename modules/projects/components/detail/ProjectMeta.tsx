import { ProjectItem } from "@/common/types/projects";

type ProjectMetaProps = Pick<ProjectItem, "role" | "year" | "status">;

const MetaItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between py-3 first:pt-0">
    <span className="text-sm text-neutral-500 dark:text-neutral-400">
      {label}
    </span>
    <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
      {value}
    </span>
  </div>
);

const ProjectMeta = ({ role, year, status }: ProjectMetaProps) => {
  const hasMeta = role || year || status;

  if (!hasMeta) return null;

  return (
    <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800">
      {role ? <MetaItem label="Role" value={role} /> : null}
      {year ? <MetaItem label="Year" value={String(year)} /> : null}
      {status ? <MetaItem label="Status" value={status} /> : null}
    </div>
  );
};

export default ProjectMeta;
