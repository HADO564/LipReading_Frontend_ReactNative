import { VisionCameraProxy, Frame } from 'react-native-vision-camera'

const plugin = VisionCameraProxy.initFrameProcessorPlugin('LiveStream')

export function stream(frame) {
  'worklet'
  if (plugin == null) throw new Error('Failed to load Frame Processor Plugin "scanFaces"!')
  return plugin.call(frame)
}