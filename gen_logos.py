from google import genai
from google.genai import types
import os, time
from dotenv import load_dotenv

# Load API key from the Musk project .env
load_dotenv(r"C:\Users\julin\Desktop\Projeto Musk Insights BR\.env")
client = genai.Client(api_key=os.getenv('GEMINI_API_KEY'))

MODEL = 'gemini-2.0-flash-exp-image-generation'

os.makedirs('logos_geradas', exist_ok=True)

prompts = [
    # 1 - Classic circle monogram
    "Design a premium minimalist monogram logo with the initials 'IF' for a clinical psychologist named Ingredy Frois. Style: elegant serif typography (like Bodoni or Didot), enclosed in a thin double circle frame. Colors: sage green (#5B7B6F) as main color, warm gold (#C8A96E) as accent. White/cream background. Clean, sophisticated, luxury feel. No text other than IF. Square format, 1:1 ratio. High resolution.",

    # 2 - Gold on dark
    "Design a luxury monogram logo with initials 'IF' for a premium clinical psychologist. Dark sage green (#4A6A5E) circular background with the letters IF in warm gold (#C8A96E) elegant serif font. Thin gold border circle. Minimalist, high-end, similar to luxury fashion brand monograms. No additional text. Square 1:1 format. High resolution.",

    # 3 - Botanical elegant
    "Design an elegant feminine logo with initials 'IF' for a clinical psychologist. Serif typography in sage green (#5B7B6F) with delicate botanical leaf elements in gold (#C8A96E) framing the letters. Minimalist line art style. Clean white background. Premium, warm, professional feel. No text other than IF. Square 1:1 format. High resolution.",

    # 4 - Modern minimal
    "Design a modern minimalist monogram logo with 'IF' initials for a psychologist. Ultra-clean sans-serif thin typography. Letters connected by a subtle golden line. Colors: sage green (#5B7B6F) letters, gold (#C8A96E) connecting element. Cream (#F5F0E8) background. Sleek, contemporary, premium. No other text. Square 1:1 format. High resolution.",

    # 5 - Overlapping letters
    "Design a sophisticated monogram where the letters I and F overlap elegantly for a clinical psychologist logo. High-contrast serif font. The overlap area creates a beautiful intersection. Main color sage green (#5B7B6F), overlap/accent in warm gold (#C8A96E). White background. Luxury brand aesthetic. No other text. Square 1:1 format. High resolution.",

    # 6 - Hexagonal frame
    "Design a premium monogram logo with 'IF' inside a thin hexagonal frame for a clinical psychologist. Elegant serif typography. Hexagon border in sage green (#5B7B6F), letters in sage green, small gold (#C8A96E) decorative details. Clean white background. Geometric, modern yet timeless. No other text. Square 1:1 format. High resolution.",

    # 7 - Script/calligraphy
    "Design an elegant calligraphic monogram with intertwined 'I' and 'F' initials for a clinical psychologist. Flowing, graceful script style. Main color sage green (#5B7B6F) with subtle gold (#C8A96E) flourishes. White background. Sophisticated, feminine, premium. Similar to high-end stationery monograms. No other text. Square 1:1 format. High resolution.",

    # 8 - Arch frame
    "Design a premium logo with 'IF' monogram under a decorative arch for a clinical psychologist. Classical architectural arch element on top in gold (#C8A96E). Letters in elegant serif, sage green (#5B7B6F). Clean white background. Inspired by luxury hotel and spa branding. No other text. Square 1:1 format. High resolution.",

    # 9 - Split bar
    "Design a clean monogram logo with 'I' and 'F' separated by a thin vertical gold bar for a clinical psychologist. Left letter 'I' in bold serif, right letter 'F' in light serif. Both in sage green (#5B7B6F), divider in gold (#C8A96E). White background. Modern luxury, balanced, professional. No other text. Square 1:1 format. High resolution.",

    # 10 - Circular badge
    "Design a circular badge-style logo with 'IF' monogram in the center for a clinical psychologist. Outer ring with subtle decorative pattern in gold (#C8A96E). Inner area with serif 'IF' in sage green (#5B7B6F). Think luxury seal or wax stamp aesthetic. Cream background. Premium, trustworthy, elegant. No other text. Square 1:1 format. High resolution.",
]

for i, prompt in enumerate(prompts, 1):
    path = f'logos_geradas/logo_{i:02d}.png'
    if os.path.exists(path) and os.path.getsize(path) > 10000:
        print(f'[SKIP] Logo {i} ja existe')
        continue

    print(f'[{i}/10] Gerando logo {i}...')
    for attempt in range(3):
        try:
            response = client.models.generate_content(
                model=MODEL,
                contents=prompt,
                config=types.GenerateContentConfig(response_modalities=['TEXT', 'IMAGE'])
            )
            for part in response.candidates[0].content.parts:
                if part.inline_data is not None:
                    with open(path, 'wb') as f:
                        f.write(part.inline_data.data)
                    print(f'  -> Salva em {path}')
                    break
            break
        except Exception as e:
            err = str(e)
            print(f'  Erro (tentativa {attempt+1}): {err[:80]}')
            if '429' in err:
                wait = 30 * (attempt + 1)
                print(f'  Rate limit, aguardando {wait}s...')
                time.sleep(wait)
            else:
                time.sleep(5)

    time.sleep(3)

print('\nPronto! Logos salvas em logos_geradas/')
