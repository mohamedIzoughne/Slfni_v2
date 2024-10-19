import * as React from "react"
import Svg, { Path } from "react-native-svg"

const BorrowingSVG = ({ isDark = false, ...props }) => (
  <Svg
    width={24}
    height={23}
    viewBox="0 0 24 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.143 10.957c.592 0 1.071-.487 1.071-1.086V7.698c0-.6-.48-1.086-1.071-1.086H13.07V4.44c0-.6-.48-1.086-1.071-1.086H9.857c-.592 0-1.071.486-1.071 1.086v5.43c0 .6.48 1.087 1.071 1.087zM9.857 4.44H12v1.086H9.857zm4.286 3.258H13.07v1.087H12V9.87h2.143zM9.857 9.871V8.785h1.072V9.87zM12 6.612H9.857v1.086H12z"
      fill={isDark ? "#FFFFFF" : "#2F5B84"}
    />
    <Path
      d="m3.681 17.419 1.557 1.853a1.036 1.036 0 0 0 1.593 0l2.35-2.798c1.706.348 2.968.243 4.364.128a35 35 0 0 1 1.82-.118 2.2 2.2 0 0 0 1.164-.37l3.812-2.593a.53.53 0 0 0 .176-.674c-.158-.322-.58-.39-.855-.166q-.128.104-.256.197a.5.5 0 0 0-.073-.217c-.185-.307-.61-.338-.866-.09a6.5 6.5 0 0 1-.7.59c-.401.293-.797.518-1.171.732-.454.259-.877.5-1.24.821-.512-.084-1.098-.114-1.663-.143-1.26-.065-2.413-.125-2.413-.773h3.671c.29.25.525.01.525-.285a.54.54 0 0 0-.528-.541 15.3 15.3 0 0 1-3.341-.42c-.808-.178-1.471-.325-2.572-.229-.577.051-1.085.399-1.407.891l-.294.45a2.1 2.1 0 0 1-.634.628l-2.773 1.523a1.08 1.08 0 0 0-.246 1.604"
      fill={isDark ? "#FFFFFF" : "#2F5B84"}
    />
  </Svg>
)
export default BorrowingSVG
