"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation";
import { useState } from "react";
import ListForm from "./forms/ListForm";
  

const CreateModal = ({
    title
}: {
    title: string,
}) => {

  const router = useRouter();
  const [Open, setOpen] = useState(true);

  const closeModal = () => {
    setOpen(false);
    router.push("/")
  }

  return (
    <Dialog open={Open} onOpenChange={closeModal}>
        <DialogContent>
            <DialogHeader>
            <DialogTitle className="flex items-start justify-between">
                Create new {title}
            </DialogTitle>
            <DialogDescription>
                {
                    title === 'list' && <ListForm />
                }
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>

  )
}

export default CreateModal