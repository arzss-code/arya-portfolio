export type ProjectItem = {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  link_demo?: string | null;
  link_github?: string | null;
  stacks: string[];
  content?: string | null;
  is_show: boolean;
  is_featured: boolean;
  role?: string | null;
  project_type?: string | null;
  year?: string | null;
  status?: string | null;
  highlight?: string | null;
  gallery?: string[] | null;
};

export type ProjectItemProps = {
  projects: ProjectItem[];
}
