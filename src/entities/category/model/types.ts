export interface MenuLink {
  label: string;
  href: string;
}

export interface MenuColumn {
  image_url: string;
  links: MenuLink[];
}

export interface Category {
  id: number;
  title: string;
  slug: string;
  menu_columns?: MenuColumn[] | null;
}