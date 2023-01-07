export interface SpeakArguments {
    text: string,
    voice: SpeechSynthesisVoice | null,
    onend: (this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => any,
    rate: number,
    pitch: number,
    volume: number
}