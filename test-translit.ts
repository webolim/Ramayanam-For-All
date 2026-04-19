import Sanscript from '@indic-transliteration/sanscript';

const engToTamilDict: Record<string, string> = {
  "bala": "பால",
  "ayodhya": "அயோத்தியா",
  "aranya": "ஆரண்ய",
  "kishkindha": "கிஷ்கிந்தா",
  "sundara": "சுந்தர",
  "yuddha": "யுத்த",
  "kandam": "காண்டம்",
  "kanda": "காண்டம்",
  "sarga": "சர்க்கம்",
  "sargam": "சர்க்கம்",
  "chapter": "சர்க்கம்",
  "rama": "ராம",
  "raman": "ராமர்",
  "ramar": "ராமர்",
  "sita": "சீதா",
  "seetha": "சீதா",
  "sitai": "சீதை",
  "seethai": "சீதை",
  "lakshman": "லட்சுமண",
  "lakshmanan": "லட்சுமணன்",
  "hanuman": "அனுமன்",
  "hanumar": "அனுமார்",
  "anjaneya": "ஆஞ்சநேய",
  "ravana": "ராவண",
  "ravanan": "ராவணன்",
  "dasaratha": "தசரத",
  "dasarathan": "தசரதன்",
  "kousalya": "கௌசல்யா",
  "kaikeyi": "கைகேயி",
  "sumitra": "சுமித்ரா",
  "sugriva": "சுக்ரீவ",
  "sugrivan": "சுக்ரீவன்",
  "vali": "வாலி",
  "vibhishana": "விபீஷண",
  "vibhishanan": "விபீஷணன்",
  "kumbhakarna": "கும்பகர்ண",
  "pravachanam": "பிரவசன",
  "pravachana": "பிரவசன",
  "roopa": "ரூப",
  "ramayana": "ராமாயண",
  "ramayanam": "ராமாயணம்",
  "valmiki": "வால்மீகி",
  "vishwamitra": "விஸ்வாமித்திர",
  "bharata": "பரத",
  "bharatan": "பரதன்",
  "shatrughna": "சத்ருக்ன",
  "shatrughnan": "சத்ருக்னன்",
  "guha": "குக",
  "guhan": "குகன்",
  "jatayu": "ஜடாயு"
};

function transliterateQuery(query: string): string {
  const words = query.toLowerCase().split(/\s+/);
  const translated = words.map(w => {
    if (engToTamilDict[w]) return engToTamilDict[w];
    if (/^[a-z]+$/.test(w)) {
      // Basic tuning
      let itrans = w.replace(/th/g, 't').replace(/sh/g, 'S');
      return Sanscript.t(itrans, 'itrans', 'tamil');
    }
    return w;
  });
  return translated.join(' ');
}

console.log(transliterateQuery("sundara kandam"));
console.log(transliterateQuery("rama vibhishana"));
console.log(transliterateQuery("vanara"));
console.log(transliterateQuery("lanka"));
console.log(transliterateQuery("sita ravana"));
