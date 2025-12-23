import Image from "next/image";
import clsx from "clsx";
import { useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { MdAdminPanelSettings as AdminIcon } from "react-icons/md";
import { FiTrash2 as DeleteIcon } from "react-icons/fi";
import { BsFillReplyAllFill as ReplyIcon } from "react-icons/bs";

import ChatTime from "./ChatTime";

import Tooltip from "@/common/components/elements/Tooltip";
import { MessageProps } from "@/common/types/chat";

interface ChatItemProps extends MessageProps {
  isWidget?: boolean;
  onDelete: (id: string) => void;
  onReply: (name: string) => void;
}

const ChatItem = ({
  id,
  name,
  email,
  image,
  message,
  created_at,
  reply_to,
  is_reply,
  isWidget,
  onDelete,
  onReply,
}: ChatItemProps) => {
  const [isHover, setIsHover] = useState(false);
  const { data: session } = useSession();

  const authorEmail = process.env.NEXT_PUBLIC_AUTHOR_EMAIL;
  const isAuthor = email === authorEmail;

  const condition = isAuthor && !isWidget;

  return (
    <div
      className={clsx(
        "flex items-center gap-3 px-4 lg:px-8",
        condition && "flex-row-reverse",
      )}
    >
      {image && (
        <Image
          src={image}
          width={40}
          height={40}
          alt={name}
          className="mt-1 rounded-full border-2 border-white/50 shadow-lg dark:border-neutral-700/50 ring-2 ring-blue-500/20"
        />
      )}

      <div
        className={clsx("space-y-1", condition && "flex flex-col items-end")}
      >
        <div
          className={clsx(
            "flex items-center gap-x-2",
            condition && "flex-row-reverse",
          )}
        >
          <div className="text-sm dark:text-neutral-200">{name}</div>
          {condition && (
            <div className="flex items-center gap-[2px] rounded-full bg-blue-500/20 backdrop-blur-sm px-1.5 py-0.5 font-medium text-blue-500 border border-blue-500/30">
              <AdminIcon size={13} />
              <span className="text-[10px]">Author</span>
            </div>
          )}
          <div className="hidden md:flex">
            <ChatTime datetime={created_at} />
          </div>
        </div>
        <div
          className={clsx(
            "group relative ml-1.5 mr-2 flex w-fit items-center gap-3",
            condition && "flex-row-reverse",
          )}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div
            className={clsx(
              "absolute top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm group-hover:bg-white dark:group-hover:bg-neutral-700",
              condition ? "-right-1" : "-left-1",
            )}
          />

          <div className="rounded-2xl bg-white/70 dark:bg-neutral-800/70 backdrop-blur-xl px-4 py-2.5 shadow-lg shadow-black/5 dark:shadow-black/20 border border-white/30 dark:border-neutral-700/50 group-hover:bg-white/90 dark:group-hover:bg-neutral-700/90 transition-all duration-300 dark:text-neutral-50">
            {is_reply && (
              <>
                <span className="text-sky-500">@{reply_to} </span>
                <span>{message}</span>
              </>
            )}
            {!is_reply && <>{message}</>}
          </div>

          {isHover && (
            <motion.button
              initial={{ opacity: 0, scale: 0, transform: "rotate(45deg)" }}
              animate={{ opacity: 1, scale: 1, transform: "rotate(0deg)" }}
              transition={{ duration: 0.2 }}
              onClick={() => onReply(name)}
            >
              <Tooltip title="Reply">
                <ReplyIcon
                  size={15}
                  className={clsx(
                    "transition duration-300 active:scale-90",
                    condition && "scale-x-[-1] active:scale-x-[-1]",
                  )}
                />
              </Tooltip>
            </motion.button>
          )}

          {session?.user?.email === authorEmail && isHover ? (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.1 }}
              onClick={() => onDelete(id)}
              className="rounded-lg bg-red-500/90 backdrop-blur-sm p-2 text-white shadow-lg shadow-red-500/25 transition-all duration-200 hover:bg-red-500 hover:scale-105"
            >
              <DeleteIcon size={17} />
            </motion.button>
          ) : null}
        </div>
        <div className="flex md:hidden">
          <ChatTime datetime={created_at} />
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
