import glob
import os
import re

motionButtonIconDir = "icon/"
motionTypeArray = ["normal","box","soccer","dance"]

for type in motionTypeArray:
    files = sorted(glob.glob(motionButtonIconDir + type + "/*"))
    for filepath in files:
        filename = os.path.basename(filepath)
        match = re.match(r'^([0-9]+)_([0-9]+)_.*\.png$', filename)
        id = match.groups()[1]
        print('<img class="'+ type +'_button" id="' + hex(int(id))[2:].zfill(2) +'" src="' + filepath +'">')