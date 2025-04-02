import { FiChevronDown, FiSearch } from "react-icons/fi";
import { TiVideo } from "react-icons/ti";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import OnClickOutside from "../../../utils/OnClickOutSide";
import { useState } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import {
  addMessage,
  updateMessageOptions,
} from "../../../store/Slices/MessageOptionsSlice";
import ReusableModal from "./ReusableModal";
import {
  toggleProfileView,
  updateViewState,
} from "../../../store/Slices/ViewManagerSlice";
import TextTranslate from "../../../utils/TextTranslate";
import { useTranslateText } from "../../../hooks/useTranslateText";
import { useNavigate } from "react-router-dom";
import useApiPost from "../../../hooks/PostData";
import { CallUserRes } from "../../../types/ResType";
import { updatePeerData } from "../../../store/Slices/PeerJsSlice";

export default function RightSideOptions() {
  const [showAllOptions, setShowAllOptions] = useState(false);
  const closeAllDropdown = () => {
    setShowAllOptions(false);
  };
  const translate = useTranslateText();
  const navigate = useNavigate();
  let dispatch = useAppDispatch();
  const MessageOptions = useAppSelector((state) => state.MessageOptions);
  const currentConversationData = useAppSelector(
    (state) => state.CurrentConversation,
  );
  const { loading, postData } = useApiPost();

  async function callUser() {
    let resData: CallUserRes = await postData("call-user", {
      conversation_id: currentConversationData.conversation_id,
      call_type: "video_call",
    });

    dispatch(updatePeerData({ room_id: resData.room_id }));
    localStorage.setItem("room_id", resData.room_id);

    navigate("/video-call");
  }

  return (
    <>
      <ReusableModal />
      <div className="flex items-center gap-2 lg:gap-4">
        <div className="flex cursor-pointer items-center">
          <Menu>
            <MenuButton className="inline-flex items-center gap-2 rounded-md py-1.5 text-sm/6 font-semibold shadow-2xl focus:outline-none data-[focus]:outline-1 lg:px-3">
              {/* <PiDotsThreeVerticalBold
                onClick={() => {
                  setShowAllOptions(true);
                }}
                className="cursor-pointer text-2xl"
              /> */}
              <TiVideo className="text-xl sm:text-2xl" />

              <FiChevronDown className="hidden w-fit lg:flex" />
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom end"
              className="z-20 w-52 origin-top-right rounded-xl border border-borderColor bg-modalBg p-1 text-sm/6 transition duration-200 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              <MenuItem>
                <div
                  onClick={() => {
                    // callUser();
                  }}
                  className="group flex w-full cursor-pointer items-center gap-2 rounded-lg py-1.5 pl-6 data-[focus]:bg-dropdownOptionHover"
                >
                  <TextTranslate text="Coming Soon" />
                  {/* {currentConversationData.is_group
                    ? "Group Info"
                    : "Contact Info"} */}
                </div>
              </MenuItem>
              {/* <MenuItem>
                <div
                  onClick={() => {
                    navigate("/video-call");
                  }}
                  className="group  flex w-full items-center gap-2 rounded-lg py-1.5 pl-6 data-[focus]:bg-dropdownOptionHover"
                >
                  <TextTranslate text="Coming Soon" />

                </div>
              </MenuItem> */}
            </MenuItems>
          </Menu>

          {/* text-lightText */}
        </div>
        <FiSearch
          onClick={() => {
            dispatch(updateViewState({ showSearchMessage: true }));
          }}
          className="cursor-pointer text-xl lg:text-2xl"
        />
        {/* <PiDotsThreeVerticalBold
          onClick={() => {
            setShowAllOptions(true);
          }}
          className="cursor-pointer text-2xl"
        /> */}
        {/* <div className="fixed top-24 w-52 text-right"> */}
        <Menu>
          <MenuButton className="inline-flex items-center rounded-md py-1.5 text-sm/6 font-semibold shadow-2xl focus:outline-none data-[focus]:outline-1 lg:px-3">
            <PiDotsThreeVerticalBold
              onClick={() => {
                setShowAllOptions(true);
              }}
              className="cursor-pointer text-2xl"
            />
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom end"
            className="z-20 w-52 origin-top-right rounded-xl border border-borderColor bg-modalBg p-1 text-sm/6 transition duration-200 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <MenuItem>
              <button
                onClick={() => {
                  dispatch(toggleProfileView(true));
                }}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 pl-6 data-[focus]:bg-dropdownOptionHover"
              >
                {translate(
                  currentConversationData.is_group
                    ? "Group Info"
                    : "Contact Info",
                )}
              </button>
            </MenuItem>
            {/* <MenuItem>
              <button
                onClick={() =>
                  dispatch(updateMessageOptions({ selectMessage: true }))
                }
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 pl-6 data-[focus]:bg-dropdownOptionHover"
              >
                Select Messages
              </button>
            </MenuItem> */}
            <MenuItem>
              <button
                onClick={() =>
                  dispatch(
                    updateMessageOptions({
                      showModal: true,
                      title: translate(
                        "Are you sure you want Clear this Chat?",
                      ),
                      description: translate(
                        "This chat will be empty but will remain in your chat list.",
                      ),
                      modalName: "clear_chat",
                    }),
                  )
                }
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 pl-6 data-[focus]:bg-dropdownOptionHover"
              >
                <TextTranslate text="Clear Chat" />
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() =>
                  // dispatch(
                  //   updateMessageOptions({
                  //     showModal: true,
                  //     title:
                  //       "Are you sure you want Permanently Delete this Chat ?",
                  //     description: "All Data with this user will be deleted",
                  //     modalName: "delete_chat",
                  //   }),
                  // )
                  dispatch(
                    updateMessageOptions({
                      selectMessage: true,
                      delete_message: true,
                    }),
                  )
                }
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 pl-6 data-[focus]:bg-dropdownOptionHover"
              >
                <TextTranslate text="Delete Chat" />
              </button>
            </MenuItem>
            {/* <MenuItem>
              <button
                onClick={() =>
                  dispatch(
                    updateMessageOptions({
                      showModal: true,
                      title: "Are you sure you want Report Alena Lubin?",
                      description: "Are you sure you want Report Alena Lubin?",
                      modalName: "report_user",
                    }),
                  )
                }
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 pl-6 data-[focus]:bg-dropdownOptionHover"
              >
                Report
              </button>
            </MenuItem> */}
            {!currentConversationData.is_group && (
              <MenuItem>
                <button
                  onClick={() =>
                    dispatch(
                      updateMessageOptions({
                        showModal: true,
                        title: `Are you sure you want ${currentConversationData.is_block ? "Unblock" : "Block"} ${currentConversationData.user_name}?`,
                        description: "",
                        modalName: "block_user",
                      }),
                    )
                  }
                  className="group flex w-full items-center gap-2 rounded-lg py-1.5 pl-6 data-[focus]:bg-dropdownOptionHover"
                >
                  {currentConversationData.is_block ? "Unblock" : "Block"}
                </button>
              </MenuItem>
            )}
          </MenuItems>
        </Menu>
        {/* </div> */}
        {/* <div className="relative">
          <OnClickOutside className={""} onClickOutside={closeAllDropdown}>
            <ul
              className={` ${
                showAllOptions
                  ? "visible translate-y-7"
                  : "invisible -translate-y-6 opacity-0"
              } bg-light text-Dark absolute -right-1 top-7 z-40 hidden w-48 flex-col gap-y-1 rounded-lg pb-2 text-base shadow-xl transition-all duration-500 lg:flex`}
            >
           
              <div
                onClick={() => {
                  setShowAllOptions(false);
                }}
                className="flex cursor-pointer gap-2 px-5 py-1 font-medium duration-300 hover:bg-gray-200"
              >
                <span>My Bookings</span>
              </div>
            </ul>
          </OnClickOutside> 
        </div> */}
      </div>
    </>
  );
}
