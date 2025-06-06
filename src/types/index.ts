export interface TextSegment {
  text: string;
  isHighlighted: boolean;
}

export interface BroadcastData {
  title: string;
  segments: TextSegment[];
}

export interface GhibliBroadcastProps {
  data: BroadcastData;
  width?: number;
  height?: number;
}