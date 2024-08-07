import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import ListForm from "../forms/ListForm"
import { useState } from "react";
import { title } from "process";
import WorkspaceForm from "../forms/WorkspaceForm";

const EditorModal = ({
    content,
    componentType,
    updateComponent,
    refreshComponent,
}: {
    content: any,
    componentType: string,
    updateComponent?: (c: any) => void
    refreshComponent?: () => void
}) => {

  const [Open, setOpen] = useState(true);

  return (
    <Dialog open={Open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {componentType}</DialogTitle>
          <DialogDescription>
            Make changes to your {componentType} here. Click update when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {componentType === 'List' && <ListForm refreshComponent={refreshComponent!} doEdit={true} listData={content} updateComponent={updateComponent}/>}
          {componentType === 'Workspace' && <WorkspaceForm refreshComponent={refreshComponent!} doEdit={true} content={content}/>}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditorModal