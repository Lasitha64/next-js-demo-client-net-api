export interface DemoEntity {
  id?: number;
  uuid?: string;
  title: string;
  description: string;
}

export interface DemoState {
  entities: DemoEntity[];
  entity: DemoEntity | null;
  loading: boolean;
  error: string | null;
}

export interface DemoFormProps {
  initialData?: DemoEntity; // Pre-fill form for edit/delete
  mode: "add" | "edit" | "delete"; // Define the mode of the form
  formSubmit: (data: DemoEntity) => void; // Action to handle form submission
}

export interface DemoListProps {
  data: DemoEntity[];
  onEdit: (entity: DemoEntity) => void;
  onDelete: (entity: DemoEntity) => void;
}
