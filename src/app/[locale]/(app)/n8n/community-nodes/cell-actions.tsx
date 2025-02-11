'use client'

import { DataTableRowActions } from '@/components/data-table-row-action'
import { useRouter } from 'next/navigation'

interface CampaignCellActionsProps {
  campaignId: string
  websiteUrl: string
  websiteId: string
}

export function CampaignCellActions({
  campaignId,
  websiteUrl,
  websiteId,
}: CampaignCellActionsProps) {
  const router = useRouter()
  const domain = new URL(websiteUrl).hostname

  // const $deleteCampaigns = honoQueryClient.campaigns[':id'].$delete

  // const mutation = useMutation<void, Error, InferRequestType<typeof $deleteCampaigns>['param']>({
  //   mutationFn: async (param) => {
  //     await $deleteCampaigns({ param })
  //   },
  //   onMutate: () => {
  //     toast.loading(`Deleting campaign ${domain}`)
  //   },
  //   onSuccess: () => {
  //     router.refresh()
  //     toast.dismiss()
  //     toast.success(`${domain} campaign deleted`)
  //   },
  //   onError: (error: Error) => {
  //     toast.error('Failed to delete campaign', {
  //       description: error.message,
  //     })
  //   },
  // })

  const onClick = () => {
    // mutation.mutate({ id: campaignId })
  }

  return (
    <DataTableRowActions>
      {/* <FindBacklinkProspectsForm
        campaignId={campaignId}
        urlLabel={websiteUrl}
        urlValue={websiteId}
        trigger={
          <ButtonRowAction onClick={() => { }} tooltip="Find Backlink Prospects">
            <Search className="size-4 text-success" />
          </ButtonRowAction>
        }
      /> */}
      {/* <AlertDialogRowAction
        onClick={onClick}
        title="Delete Campaign"
        description={`Are you sure you want to delete the campaign for ${domain}? This will delete all associated data including prospects and messages.`}
        cancelButtonLabel="Cancel"
        buttonLabel="Delete"
      >
        <ButtonRowAction onClick={() => { }} tooltip="Delete Campaign">
          <Trash2Icon className="size-4 text-error" />
        </ButtonRowAction>
      </AlertDialogRowAction> */}
    </DataTableRowActions>
  )
}
