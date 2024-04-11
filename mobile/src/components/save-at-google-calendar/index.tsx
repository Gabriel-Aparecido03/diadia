import { Button, Typography } from "../ui";

interface SaveAtGoogleCalendarProps {
  onClickToSave?: () => void
}

export function SaveAtGoogleCalendar({ onClickToSave }: SaveAtGoogleCalendarProps) {
  return (
    <Button
      onPress={onClickToSave}
      style={{ marginTop: 32 }} variants="primary"
    >
      <Typography text={"Salvar no Google Calendar"} />
    </Button>
  )
}