import glob
import os


print("'/',")
for current_dir, sub_dirs, files_list in os.walk('./'):
    for file in files_list:
        #print("'." + current_dir + file + "',")
        if(current_dir[-1] != '/'): current_dir += '/'
        current_dir = current_dir.replace(os.sep,'/')
        if(current_dir[2:6] != '.git'): print("'" + current_dir[2:] + file + "',")