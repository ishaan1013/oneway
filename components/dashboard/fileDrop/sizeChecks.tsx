import { TbLineDashed } from "react-icons/tb"
import * as Tooltip from "@radix-ui/react-tooltip"

const SizeChecks = ({
  horizontal,
  horizontalCheck,
  verticalCheck,
  setHorizontalCheck,
  setVerticalCheck,
}: {
  horizontal: boolean
  horizontalCheck: boolean
  verticalCheck: boolean
  setHorizontalCheck: (horizontalCheck: boolean) => void
  setVerticalCheck: (verticalCheck: boolean) => void
}) => {
  return (
    <>
      <Tooltip.Provider delayDuration={500} skipDelayDuration={500}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            {horizontal ? (
              <button
                onClick={() => setHorizontalCheck(!horizontalCheck)}
                disabled={verticalCheck}
                className={`flex select-none items-center justify-center rounded border-[1px] ${
                  horizontalCheck
                    ? "border-white/50 bg-white/[0.15] hover:border-white/75 hover:bg-white/25"
                    : "border-white/25 bg-black hover:border-white/75 hover:bg-white/10 disabled:cursor-not-allowed disabled:hover:border-white/25 disabled:hover:bg-black"
                } p-1.5 text-2xl font-medium duration-200`}>
                <TbLineDashed />
              </button>
            ) : (
              <button
                onClick={() => setVerticalCheck(!verticalCheck)}
                disabled={horizontalCheck}
                className={`flex rotate-90 select-none items-center justify-center rounded border-[1px] ${
                  verticalCheck
                    ? "border-white/50 bg-white/[0.15] hover:border-white/75 hover:bg-white/25"
                    : "border-white/25 bg-black hover:border-white/75 hover:bg-white/10 disabled:cursor-not-allowed disabled:hover:border-white/25 disabled:hover:bg-black"
                } p-1.5 text-2xl font-medium duration-200`}>
                <TbLineDashed />
              </button>
            )}
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className="z-50 select-none rounded border-[1px] border-white/25 bg-[#191919] px-1.5 py-1 text-xs font-medium shadow-[0_0px_100px_15px_rgba(0,0,0,0.5)]"
              sideOffset={5}
              side="bottom">
              {horizontal ? "Horizontal Line Check" : "Vertical Line Check"}
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </>
  )
}

export default SizeChecks
