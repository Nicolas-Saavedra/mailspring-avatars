import AvatarImage from "./avatar-image";
import { React } from "mailspring-exports";

const regularRedirect =
  /^(.*) - ([a-zA-Z0-9._%+-]+\(a\)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

const lowInfoRedirect = /^(.*) - ([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

const atRedirect = /([a-zA-Z0-9._%+-]+) at ([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

const atEscapedRedirect =
  /^(.*) - '([a-zA-Z0-9._%+-]+) at ([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})'$/;

/**
 * @param name {string}
 */
function obtainEmailAndName(name) {
  let match = name.match(regularRedirect);
  if (match) {
    return [match[1], match[2].replace("(a)", "@")];
  }
  match = name.match(lowInfoRedirect);
  if (match) {
    return [match[1], `${match[1].split(" ")[0].toLowerCase()}@${match[2]}`];
  }
  match = name.match(atRedirect);
  if (match) {
    return [match[1], `${match[1]}@${match[2]}`];
  }
  match = name.match(atEscapedRedirect);
  if (match) {
    return [match[1], `${match[2]}@${match[3]}`];
  }
  return [null, null];
}

export default function (size, name) {
  const Avatar = (props) => {
    const { thread = {} } = props;
    const { participants = [] } = thread;
    const { __messages = {} } = thread;

    if (!participants.length) return <noscript />;

    let participant = participants[participants.length - 1];

    if (participant.isMe() && participants.length > 1) {
      participant = participants[participants.length - 2];
    }

    if (!participant) return <noscript />;

    if (__messages.length > 0) {
      const rawName = __messages[0].from[0].name;
      if (rawName) {
        const [name, email] = obtainEmailAndName(rawName);
        if (name && email) {
          // console.log(`Matched ${name} with email ${email}`);
          return (
            <AvatarImage
              email={email}
              name={name}
              className="thread-avatar"
              size={size}
              round={true}
            />
          );
        }
      }
    }
    // console.log(`Did not match ${participant.name} with email ${participant.email}`,);
    return (
      <AvatarImage
        email={participant.email}
        name={participant.name}
        className="thread-avatar"
        size={size}
        round={true}
      />
    );
  };
  Avatar.displayName = name;
  return Avatar;
}
