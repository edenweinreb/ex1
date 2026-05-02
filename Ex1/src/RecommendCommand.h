#ifndef RECOMMEND_COMMAND_H
#define RECOMMEND_COMMAND_H

class RecommendCommand: public ICommand {
// TODO: Implement the interface logic 
public:
void execute() override;
virtual ~RecommendCommand() {}

};

#endif