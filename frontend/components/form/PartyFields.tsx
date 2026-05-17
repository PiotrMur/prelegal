import { Party } from '@/domain/types'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Textarea } from '@/components/ui/Textarea'

interface Props {
  label: string
  party: Party
  onChange: (updated: Party) => void
}

export function PartyFields({ label, party, onChange }: Props) {
  const idPrefix = label.toLowerCase().replace(' ', '-')

  const handleChange = (field: keyof Party, value: string) => {
    onChange({ ...party, [field]: value })
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <Label htmlFor={`${idPrefix}-name`} required>
          Print Name
        </Label>
        <Input
          id={`${idPrefix}-name`}
          value={party.printName}
          onChange={(e) => handleChange('printName', e.target.value)}
          placeholder="Full legal name"
        />
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-company`} required>
          Company
        </Label>
        <Input
          id={`${idPrefix}-company`}
          value={party.company}
          onChange={(e) => handleChange('company', e.target.value)}
          placeholder="Legal entity name"
        />
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-title`}>Title</Label>
        <Input
          id={`${idPrefix}-title`}
          value={party.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="e.g. Chief Executive Officer"
        />
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-address`}>Notice Address</Label>
        <Textarea
          id={`${idPrefix}-address`}
          value={party.noticeAddress}
          onChange={(e) => handleChange('noticeAddress', e.target.value)}
          placeholder="Street address, city, state, zip"
          rows={2}
        />
      </div>
    </div>
  )
}
