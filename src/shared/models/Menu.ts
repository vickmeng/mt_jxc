export interface Menu {
  id: number;
  title: string;
  icon: string;
  link?: string; 
  subMenus: SubMenu[];
}

export interface SubMenu {
  id: number;
  title: string;
  link: string;
}