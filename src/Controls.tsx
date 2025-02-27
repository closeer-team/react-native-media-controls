import React from "react";
import { TouchableOpacity, View, ActivityIndicator, Image } from "react-native";
import styles from "./MediaControls.style";
import { getPlayerStateIcon } from "./utils";
import { Props } from "./MediaControls";
import { PLAYER_STATES } from "./constants/playerStates";

type ControlsProps = Pick<
  Props,
  "isLoading" | "mainColor" | "playerState" | "onReplay"
> & {
  onPause: () => void;
};

const Controls = (props: ControlsProps) => {
  const { isLoading, mainColor, playerState, onReplay, onPause } = props;
  const icon = getPlayerStateIcon(playerState);
  const pressAction = playerState === PLAYER_STATES.ENDED ? onReplay : onPause;

  const content = isLoading ? (
    <ActivityIndicator size="large" color={mainColor} />
  ) : (
    <TouchableOpacity
      style={[styles.playButton]}
      onPress={pressAction}
      accessibilityLabel={PLAYER_STATES.PAUSED ? "Tap to Play" : "Tap to Pause"}
      accessibilityHint={"Plays and Pauses the Video"}
    >
      <Image source={icon} style={[styles.playIcon, {tintColor: mainColor}]} />
    </TouchableOpacity>
  );

  return <View style={[styles.controlsRow]}>{content}</View>;
};

export { Controls };
