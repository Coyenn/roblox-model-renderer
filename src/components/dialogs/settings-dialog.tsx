import { SettingsForm } from "@/components/forms/settings-form";
import SettingsIcon from "@/components/icons/settings-icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function SettingsDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant={"default"} className="gap-2">
          <SettingsIcon className="h-4 w-4" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Image Settings</DialogTitle>
        </DialogHeader>
        <SettingsForm onSubmit={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
