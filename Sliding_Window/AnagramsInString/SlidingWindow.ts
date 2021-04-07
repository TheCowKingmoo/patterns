 
const ASCII_RANGE = 255;


class SlidingWindow  {

    findAnagrams(s: string, p: string): number[] {
        if(p.length > s.length)  {
            return [] as number[];
        }

        var freq: number[] = new Array(ASCII_RANGE).fill(0);    // how many times each char in the p string occur
        for(var i : number = 0; i < p.length; i++)  {
            freq[p.charCodeAt(i)]++;
        }


        var result: number[] = new Array();     // return val

        var headIndex:number = 0;               // this is the beginning of the window
        var endIndex:number = 0;                // this is the end of the window
        var numTillAnagram: number = p.length;  // this is the number of chars that are in the anagram we have had in a row


        while(endIndex < s.length)  {

            var currentCharNumber: number = s.charCodeAt(endIndex);

            // find a good char
            if(freq[currentCharNumber] > 0)  {

                numTillAnagram--;  // this value is only moved around when we find a good char entering/leaving the window
            }

            // decrement the char in freq
            freq[currentCharNumber]--;

            if(numTillAnagram < 1)  {
                result.push(headIndex);
            }


            // as the window closes behind it we add that char 
            // just leaving the window back to the freq
            // - 1 as this is for the next actual loop
            if(endIndex >= p.length - 1)  {
                var leavingWindowChar: number = s.charCodeAt(headIndex);
                // -1 values mean that they are not in the p string
                if(freq[leavingWindowChar] > -1)  {
                    numTillAnagram++;
                }
                freq[leavingWindowChar]++;
                headIndex++;
            }
            endIndex++;
        }
        return result;
    };

}
