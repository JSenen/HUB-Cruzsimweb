import json
# now i need to show the mask in a 2D plot
# i will use matplotlib.pyplot.imshow
import matplotlib.pyplot as plt
import numpy as np

masks = {}
# open maskLagunaOrlaInterpoladaRotada.json 
# with open('utils\Masks\maskRaiseOrlaMaltaROTADA.json', 'r') as f:
# utils\Masks\MaskDescarregadaRaise.json
with open('utils\Masks\paneles\Panel_10x2.json', 'r') as f:
    data = json.load(f)
    # For each mask, i need to create a image titled with the mask name andshow them
    for key in data.keys():
        mask = np.array(data[key])
        # get the max value of the mask diferent of 65535 
        max = 0
        for i in range(0, len(mask)):
            for j in range(0, len(mask[i])):
                if mask[i][j] > max and mask[i][j] != 65535:
                    max = mask[i][j]
        
        # set the max value of the mask to the value we found + 100
        mask[mask > max] = max+100

        masks[key] = mask


# create a figure with n subplots (n = len(masks))
# Keep the margins small
# the window should fit in the screen (1080p)
fig, axs = plt.subplots(2, int(len(masks)/2), figsize=(20, 10), dpi=80)
# remove the margins
fig.subplots_adjust(left=0, right=1, bottom=0, top=1)
fig.tight_layout()



# for each mask, show it in a subplot
for i in range(0, len(masks)):
    # if the name of the mask ends with 1 draw it in green else draw it in red
    if list(masks.keys())[i].endswith('1'):
        axs[int(i%2)][int(i//2)].imshow(masks[list(masks.keys())[i]], cmap='Greens_r')
    else:
        axs[int(i%2)][int(i//2)].imshow(masks[list(masks.keys())[i]], cmap='Reds_r')
    axs[int(i%2)][int(i//2)].set_title(list(masks.keys())[i])

plt.show()