
const ASCII_RANGE = 255;

class LongestSubString  {
    characterReplacement(s: string, k: number): number {

        if(s.length == 0)  {
            return -1;
        }

        var freq: number[] = new Array(ASCII_RANGE).fill(0);

        var longestCurrentChar: number = s.charCodeAt(0);
        var secondLongestChar: number = s.charCodeAt(0); //easier than reiterating thru array for the new longest char when it potentially needs to change

        var headIndex: number = 0;
        var tailIndex: number = 0;

        var result:number = 0;

        while(tailIndex < s.length)  {
            var currentChar: number = s.charCodeAt(tailIndex);
            

            freq[currentChar]++;
            if(freq[currentChar] > freq[longestCurrentChar])  {
                secondLongestChar = longestCurrentChar;
                longestCurrentChar = currentChar;
            }

            if(result < freq[longestCurrentChar] + k)  {
                result = freq[longestCurrentChar] + k;
            }

            var currentWindowLength = tailIndex - headIndex + 1;

            // if longest string + k < currentWindowLength then we know that there is at least one too many chars for k to account for
            // we need to move the window
            if(freq[longestCurrentChar] + k < currentWindowLength)  {
                var leavingWindowChar = s.charCodeAt(headIndex);
                freq[leavingWindowChar]--;

                // need to make sure if the longest char has moved
                if(leavingWindowChar == longestCurrentChar)  {
                    if(freq[secondLongestChar] > freq[leavingWindowChar])  {
                        longestCurrentChar = secondLongestChar;
                    }
                }
                headIndex++;

            }
            tailIndex++;
        }

        if(result > s.length)  {
            return s.length;
        }
        return result;
    };
}