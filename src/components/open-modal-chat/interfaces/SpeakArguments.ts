export interface SpeakArguments {
    text: string,
    voice?: SpeechSynthesisVoice | null,
    onend?: (this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => any,
    rate?: number,
    pitch?: number,
    volume?: number,
    onboundary?: (this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => any,
    onerror?: (this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => any,
    onmark?: (this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => any,
    onpause?: (this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => any,
    onresume?: (this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => any,
    onstart?: (this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => any,
}