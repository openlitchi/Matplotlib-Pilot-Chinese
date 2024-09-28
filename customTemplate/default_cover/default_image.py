import matplotlib.pyplot as plt 

fig, ax = plt.subplots(figsize=(3.5, 3))

ax.axis('off')

ax.text(0.03, 0.55, "No Cover Picture", size=24)
ax.text(0.3, 0.15, "Matplotlib Pilot", size=12)

plt.savefig('default_cover.png', bbox_inches='tight', dpi=100)
# plt.show()

