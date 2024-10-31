import { HexoLocalsData } from "hexo/dist/hexo/locals-d";
import { PageSchema } from "hexo/dist/types";

export type TemplateLocals = HexoLocalsData & { page: PageSchema };

// export interface TemplateLocals extends HexoLocalsData {
//   page: PageSchema
// }
