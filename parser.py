import googlesearch
import PyPDF2
pdf = PyPDF2.PdfFileReader('CV.pdf')

for page in pdf.pages:
    print(page.extractText())
# rawText = parser.from_file('CV.pdf')

# rawList = rawText['content'].splitlines()
# for line in rawList:
#     print(line)
# for line in rawList:
    
#     results = googlesearch.search(line,start=1,stop=1, pause=1)

#     for res in results:
#         print(res)