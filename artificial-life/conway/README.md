![Taskmanager](https://img.shields.io/badge/time_spent-9h-green)

# Conways Game of Life

This is a web implementation of the popular "Conways Game of Life", a cell simulation with simple rules resulting in interesting formations.

If you have further ideas or found a bug, don't hesitate to send me a mail or create an issue.

### Feature and Ideas:
- [X] Start / Stop / Step Simulation
- [X] Step Counter
- [X] Change Speed of Simulation
- [X] Library of known structures
- [X] Different Rules (disabled)
- [X] Rotate Structures in Library (thanks to @RedAicm)
- [ ] Different Border Configurations (could use improvements)
- [ ] Run Simulation until Step X
- [ ] Outputs: like number of living cells
- [ ] Change Canvas Size
- [ ] Full Screen
- [ ] Draw individual Cells with mouse input
- [ ] Implement Rule Evaluation as Kernels in WebGL for better performance ^^'

#### Contributions
If you want to contribute to this simulation, feel free to do so - i'll happly merge a good pull request :)

#### Testing
As this project does not have any dependencies (except for p5.js which is loaded by the browser via CDN), you can simply open the `index.html` in your browser and everything should be ready for testing already. If you want to be fancier, you can also use your http server of choice. I use `npx http-server` to run the http-server package from npm without installing it.